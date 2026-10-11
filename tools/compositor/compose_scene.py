import sys, os, json, re, math
import ctypes
from ctypes import wintypes
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='backslashreplace')

def get_target_screen_metrics(target_index=0):
    """
    Detects the active screen resolution and aspect ratio using Windows Win32 API.
    Handles high DPI scaling properly via SetProcessDPIAware.
    """
    try:
        user32 = ctypes.windll.user32
        user32.SetProcessDPIAware()
        monitors = []
        def _cb(hmon, hdc, lprect, lparam):
            r = lprect.contents
            monitors.append((r.right - r.left, r.bottom - r.top))
            return 1
        MONITORENUMPROC = ctypes.WINFUNCTYPE(ctypes.c_int, wintypes.HMONITOR, wintypes.HDC, ctypes.POINTER(wintypes.RECT), wintypes.LPARAM)
        user32.EnumDisplayMonitors(None, None, MONITORENUMPROC(_cb), 0)
        if monitors and 0 <= target_index < len(monitors):
            return monitors[target_index]
        w = user32.GetSystemMetrics(0)
        h = user32.GetSystemMetrics(1)
        if w > 0 and h > 0:
            return (w, h)
    except Exception as e:
        print(f"[ScreenMetrics] Fallback: {e}")
    return (1920, 1080)

def frame_to_screen_aspect(image, screen_w, screen_h):
    """
    Crops / frames the composited canvas to match the exact target monitor aspect ratio
    (e.g., 16:9, 16:10, 21:9), centered identically to Wallpaper Engine's camera projection.
    This guarantees zero distortion and zero accidental cropping of character faces/eyes in Spotify!
    """
    if not image or screen_w <= 0 or screen_h <= 0:
        return image
    
    iw, ih = image.size
    target_aspect = float(screen_w) / float(screen_h)
    img_aspect = float(iw) / float(ih)
    
    # If aspect ratio is already close (within 0.5%), keep original
    if abs(target_aspect - img_aspect) < 0.005:
        return image
        
    if target_aspect > img_aspect:
        # Screen is wider than image: crop top and bottom equally
        new_w = iw
        new_h = int(round(float(iw) / target_aspect))
        left = 0
        top = int(round(float(ih - new_h) / 2.0))
        right = iw
        bottom = top + new_h
    else:
        # Screen is taller than image (e.g., 16:10 laptop vs 16:9 wallpaper): crop left and right equally
        new_h = ih
        new_w = int(round(float(ih) * target_aspect))
        left = int(round(float(iw - new_w) / 2.0))
        top = 0
        right = left + new_w
        bottom = ih
        
    left = max(0, min(left, iw - 1))
    top = max(0, min(top, ih - 1))
    right = max(left + 1, min(right, iw))
    bottom = max(top + 1, min(bottom, ih))
    
    cropped = image.crop((left, top, right, bottom))
    print(f"[AspectFraming] Canvas: {iw}x{ih} ({img_aspect:.4f}) -> Framed: {cropped.size[0]}x{cropped.size[1]} ({target_aspect:.4f}) for screen {screen_w}x{screen_h}")
    return cropped

def resolve_scene(cache_dir, target_w=None, target_h=None):
    final_output = os.path.join(cache_dir, "resolved_wallpaper.jpg")
    
    # 1. Resolve target screen size & aspect ratio
    if target_w and target_h and int(target_w) > 0 and int(target_h) > 0:
        screen_w, screen_h = int(target_w), int(target_h)
    else:
        screen_w, screen_h = get_target_screen_metrics()
    print(f"[TargetScreen] {screen_w}x{screen_h} (Aspect: {screen_w/screen_h:.4f})")

    # 2. Check for video files (.mp4, .webm)
    for f in os.listdir(cache_dir):
        if f.lower().endswith(('.mp4', '.webm')):
            video_path = os.path.join(cache_dir, f)
            tools_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            shellthumb = os.path.join(tools_dir, "shellthumb", "ShellThumb.exe")
            frame_png = os.path.join(cache_dir, "video_frame.png")
            if os.path.exists(shellthumb):
                import subprocess
                subprocess.run([shellthumb, video_path, frame_png], capture_output=True)
                if os.path.exists(frame_png):
                    im = Image.open(frame_png).convert("RGBA")
                    im = frame_to_screen_aspect(im, screen_w, screen_h)
                    im.convert("RGB").save(final_output, quality=96)
                    print(f"RESOLVED_VIDEO: {f} -> {final_output}")
                    return final_output

    # 3. Check for scene.json
    scene_json = os.path.join(cache_dir, "scene.json")
    if os.path.exists(scene_json):
        try:
            with open(scene_json, 'r', encoding='utf-8', errors='ignore') as sf:
                sdata = json.load(sf)
            
            objects = sdata.get('objects', [])
            proj = sdata.get('general', {}).get('orthogonalprojection', {})
            
            valid_objs = [o for o in objects if o.get('size') and o.get('origin')]
            
            if valid_objs:
                cw = int(proj.get('width', 0)) if proj else 0
                ch = int(proj.get('height', 0)) if proj else 0
                if cw <= 0 or ch <= 0:
                    for vo in valid_objs:
                        sw, sh = [float(x) for x in vo['size'].split()[:2]]
                        if sw > cw: cw = int(round(sw))
                        if sh > ch: ch = int(round(sh))
                if cw <= 0 or ch <= 0:
                    cw, ch = 1920, 1080

                cc_str = sdata.get('general', {}).get('clearcolor', '0.07 0.07 0.07')
                try:
                    cc_parts = [int(float(c) * 255) for c in cc_str.split()[:3]]
                    bg_col = (cc_parts[0], cc_parts[1], cc_parts[2], 255)
                except:
                    bg_col = (18, 18, 18, 255)

                canvas = Image.new("RGBA", (cw, ch), bg_col)
                rendered_layers = 0

                def find_tex(image_path, obj_size):
                    if not image_path:
                        return None
                    base = os.path.splitext(os.path.basename(image_path))[0]
                    # Direct match
                    for ext in ['.png', '.jpg', '.jpeg', '.webp']:
                        p = os.path.join(cache_dir, base + ext)
                        if os.path.exists(p): return p
                    # Material JSON pass lookup
                    for mat_candidate in [os.path.join(cache_dir, base + '.json'),
                                          os.path.join(cache_dir, 'materials', base + '.json')]:
                        if os.path.exists(mat_candidate):
                            try:
                                with open(mat_candidate, 'r', encoding='utf-8', errors='ignore') as mf:
                                    mdata = json.load(mf)
                                for pass_obj in mdata.get('passes', []):
                                    for tname in pass_obj.get('textures', []):
                                        t_base = os.path.splitext(os.path.basename(tname))[0]
                                        for ext in ['.png', '.jpg', '.jpeg', '.webp']:
                                            tp = os.path.join(cache_dir, t_base + ext)
                                            if os.path.exists(tp): return tp
                                if 'material' in mdata:
                                    sub_base = os.path.splitext(os.path.basename(mdata['material']))[0]
                                    for ext in ['.png', '.jpg', '.jpeg', '.webp']:
                                        tp = os.path.join(cache_dir, sub_base + ext)
                                        if os.path.exists(tp): return tp
                            except:
                                pass
                    # Exact size match
                    if obj_size:
                        ow, oh = int(round(obj_size[0])), int(round(obj_size[1]))
                        for f in os.listdir(cache_dir):
                            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not f.startswith(('resolved', 'test_', 'preview')):
                                fp = os.path.join(cache_dir, f)
                                try:
                                    with Image.open(fp) as im:
                                        if im.size == (ow, oh):
                                            return fp
                                except:
                                    pass
                    return None

                for obj in valid_objs:
                    vis = obj.get('visible')
                    if vis is False:
                        continue
                    if isinstance(vis, dict) and vis.get('value') is False:
                        continue

                    img_ref = obj.get('image', '')
                    sw, sh = [float(x) for x in obj['size'].split()[:2]]
                    cx, cy = [float(x) for x in obj['origin'].split()[:2]]
                    
                    # In Wallpaper Engine coordinate system:
                    # (0, 0) is bottom-left, origin is the center of the element
                    x = int(round(cx - sw / 2.0))
                    y = int(round(ch - (cy + sh / 2.0)))
                    iw, ih = int(round(sw)), int(round(sh))

                    # Handle solid color background layer
                    if img_ref and 'solidlayer' in img_ref.lower():
                        col_str = obj.get('color', '0 0 0')
                        try:
                            rgb = [int(float(c) * 255) for c in col_str.split()[:3]]
                        except:
                            rgb = [0, 0, 0]
                        for eff in obj.get('effects', []):
                            for pas in eff.get('passes', []):
                                vals = pas.get('constantshadervalues', {})
                                if 'color' in vals:
                                    try:
                                        tc = [int(float(c) * 255) for c in vals['color'].split()[:3]]
                                        rgb = tc
                                    except:
                                        pass
                        solid_im = Image.new("RGBA", (iw, ih), (rgb[0], rgb[1], rgb[2], 255))
                        canvas.alpha_composite(solid_im, (x, y))
                        rendered_layers += 1
                        continue

                    tex_file = find_tex(img_ref, (sw, sh))
                    if tex_file and os.path.exists(tex_file):
                        try:
                            layer_im = Image.open(tex_file).convert("RGBA")
                            if layer_im.size != (iw, ih):
                                layer_im = layer_im.resize((iw, ih), Image.Resampling.LANCZOS)
                                
                            # Handle horizontal / vertical flip scale
                            scale_str = obj.get('scale', '1 1 1')
                            try:
                                sx, sy = [float(s) for s in scale_str.split()[:2]]
                                if sx < 0:
                                    layer_im = layer_im.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
                                if sy < 0:
                                    layer_im = layer_im.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
                            except:
                                pass
                                
                            # Handle roll rotation angle
                            angles_str = obj.get('angles', '0 0 0')
                            try:
                                roll = float(angles_str.split()[2]) if len(angles_str.split()) >= 3 else 0
                                if abs(roll) > 0.01:
                                    deg = math.degrees(roll) if abs(roll) < 6.283 else roll
                                    layer_im = layer_im.rotate(-deg, resample=Image.Resampling.BICUBIC, expand=True)
                                    rw, rh = layer_im.size
                                    x = int(round(cx - rw / 2.0))
                                    y = int(round(ch - (cy + rh / 2.0)))
                            except:
                                pass

                            # Safe bounds clipping
                            lx = max(0, x)
                            ly = max(0, y)
                            lw = min(layer_im.size[0] - (lx - x), cw - lx)
                            lh = min(layer_im.size[1] - (ly - y), ch - ly)
                            if lw > 0 and lh > 0:
                                crop_layer = layer_im.crop((lx - x, ly - y, lx - x + lw, ly - y + lh))
                                canvas.alpha_composite(crop_layer, (lx, ly))
                                rendered_layers += 1
                        except Exception as err:
                            print(f"[LayerCompositeError] {obj.get('name')}: {err}")

                if rendered_layers > 0:
                    # FRAME TO EXACT TARGET MONITOR ASPECT RATIO
                    framed_canvas = frame_to_screen_aspect(canvas, screen_w, screen_h)
                    framed_canvas.convert("RGB").save(final_output, quality=96)
                    print(f"RESOLVED_SCENE_TREE: {final_output} (canvas: {cw}x{ch}, framed: {framed_canvas.size[0]}x{framed_canvas.size[1]}, {rendered_layers} layers)")
                    return final_output
        except Exception as e:
            print(f"SCENE_TREE_ERROR: {e}")

    # 4. Fallback (when scene.json is absent or invalid)
    imgs = []
    mask_patterns = ('mask', 'particle', 'sprite', 'noise', 'brush', 'distortion', 'normal', 'opacitymap', 'text_', 'font', 'clipping')
    for f in os.listdir(cache_dir):
        if f.startswith(('resolved_', 'test_', 'preview_')):
            continue
        ext = os.path.splitext(f)[1].lower()
        if ext in ('.png', '.jpg', '.jpeg', '.webp'):
            low = f.lower()
            if any(p in low for p in mask_patterns):
                continue
            fp = os.path.join(cache_dir, f)
            try:
                im = Image.open(fp)
                zero_alpha_ratio = 0.0
                if 'A' in im.mode:
                    alpha = im.split()[3]
                    zero_alpha_ratio = alpha.histogram()[0] / (im.size[0] * im.size[1])
                
                imgs.append({
                    'path': fp,
                    'name': f,
                    'width': im.size[0],
                    'height': im.size[1],
                    'pixels': im.size[0] * im.size[1],
                    'size_bytes': os.path.getsize(fp),
                    'zero_alpha_ratio': zero_alpha_ratio,
                    'is_opaque': (zero_alpha_ratio < 0.05)
                })
            except:
                pass

    if not imgs:
        print("NO_ARTWORK_IMAGES")
        return None

    # Priority A: Check if a master artwork exists (原, wallpaper, main, background, cover, full)
    for x in sorted(imgs, key=lambda i: i['pixels'], reverse=True):
        bname = os.path.splitext(x['name'])[0].lower()
        if any(k in bname for k in ('原', 'wallpaper', 'main', 'background', 'cover', 'full', 'base')) and x['is_opaque']:
            im = Image.open(x['path'])
            im = frame_to_screen_aspect(im.convert("RGBA"), screen_w, screen_h)
            im.convert("RGB").save(final_output, quality=96)
            print(f"RESOLVED_ORIGINAL_IMAGE: {x['name']} -> {final_output} (Framed: {im.size[0]}x{im.size[1]})")
            return final_output

    # Priority B: Base image + large overlay composite (DO NOT stretch small sub-elements like eyes/mouths)
    opaque_bases = [x for x in imgs if x['is_opaque']]

    if opaque_bases:
        base_info = max(opaque_bases, key=lambda x: (x['pixels'], x['size_bytes']))
        base_im = Image.open(base_info['path']).convert("RGBA")
        base_size = base_im.size

        # Only composite layers that are AT LEAST 70% of the base size (e.g. background layers, foreground body)
        large_overlays = [x for x in imgs if not x['is_opaque'] and x['pixels'] >= base_info['pixels'] * 0.70]
        for t in sorted(large_overlays, key=lambda x: x['size_bytes']):
            try:
                layer_im = Image.open(t['path'])
                if layer_im.size != base_size:
                    layer_im = layer_im.resize(base_size, Image.Resampling.LANCZOS)
                base_im.alpha_composite(layer_im.convert("RGBA"))
            except:
                pass

        framed = frame_to_screen_aspect(base_im, screen_w, screen_h)
        framed.convert("RGB").save(final_output, quality=96)
        print(f"RESOLVED_CANVAS_COMPOSITE: {final_output} (base: {base_info['name']}, overlays: {len(large_overlays)})")
        return final_output

    best = max(imgs, key=lambda x: (1 if x['is_opaque'] else 0, x['pixels'], x['size_bytes']))
    im = Image.open(best['path']).convert("RGBA")
    framed = frame_to_screen_aspect(im, screen_w, screen_h)
    framed.convert("RGB").save(final_output, quality=96)
    print(f"RESOLVED_BEST_IMAGE: {best['name']} -> {final_output}")
    return final_output

if __name__ == "__main__":
    if len(sys.argv) > 1:
        tw = sys.argv[2] if len(sys.argv) > 2 else None
        th = sys.argv[3] if len(sys.argv) > 3 else None
        res = resolve_scene(sys.argv[1], target_w=tw, target_h=th)
        if res and os.path.exists(res):
            print("FINAL_RESULT:" + res)
        else:
            print("FINAL_RESULT:FAILED")

import sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='backslashreplace')

def resolve_scene(cache_dir, workshop_folder=None):
    final_output = os.path.join(cache_dir, "resolved_wallpaper.jpg")
    
    for f in os.listdir(cache_dir):
        if f.lower().endswith(('.mp4', '.webm')):
            video_path = os.path.join(cache_dir, f)
            tools_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            shellthumb = os.path.join(tools_dir, "shellthumb", "ShellThumb.exe")
            if os.path.exists(shellthumb):
                import subprocess
                subprocess.run([shellthumb, video_path, frame_png], capture_output=True)
                if os.path.exists(frame_png):
                    im = Image.open(frame_png).convert("RGB")
                    im.save(final_output, quality=95)
                    print(f"RESOLVED_VIDEO: {f} -> {final_output}")
                    return final_output

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
                    for ext in ['.png', '.jpg', '.jpeg', '.webp']:
                        p = os.path.join(cache_dir, base + ext)
                        if os.path.exists(p): return p
                    for mat_candidate in [os.path.join(cache_dir, base + '.json'),
                                          os.path.join(cache_dir, 'materials', base + '.json')]:
                        if os.path.exists(mat_candidate):
                            try:
                                with open(mat_candidate, 'r', encoding='utf-8', errors='ignore') as mf:
                                    mdata = json.load(mf)
                                for pass_obj in mdata.get('passes', []):
                                    for tname in pass_obj.get('textures', []):
                                        for ext in ['.png', '.jpg', '.jpeg', '.webp']:
                                            tp = os.path.join(cache_dir, tname + ext)
                                            if os.path.exists(tp): return tp
                            except:
                                pass
                    if obj_size:
                        ow, oh = int(round(obj_size[0])), int(round(obj_size[1]))
                        for f in os.listdir(cache_dir):
                            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not f.startswith(('resolved', 'test_')):
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
                    
                    x = int(round(cx - sw / 2.0))
                    y = int(round(ch - (cy + sh / 2.0)))
                    iw, ih = int(round(sw)), int(round(sh))

                    if 'solidlayer' in img_ref.lower():
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
                                layer_im = layer_im.resize((iw, ih), Image.Resampling.BILINEAR)
                            canvas.alpha_composite(layer_im, (x, y))
                            rendered_layers += 1
                        except Exception as err:
                            pass

                if rendered_layers > 0:
                    canvas.convert("RGB").save(final_output, quality=95)
                    print(f"RESOLVED_SCENE_TREE: {final_output} ({cw}x{ch}, {rendered_layers} layers)")
                    return final_output
        except Exception as e:
            print(f"SCENE_TREE_ERROR: {e}")

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

    for x in sorted(imgs, key=lambda i: i['pixels'], reverse=True):
        bname = os.path.splitext(x['name'])[0].lower()
        if any(k in bname for k in ('原', 'wallpaper', 'main', 'background', 'cover', 'full')) and x['is_opaque']:
            im = Image.open(x['path'])
            if 'A' in im.mode:
                base_bg = Image.new("RGBA", im.size, (18, 18, 18, 255))
                base_bg.alpha_composite(im)
                im = base_bg.convert("RGB")
            else:
                im = im.convert("RGB")
            im.save(final_output, quality=95)
            print(f"RESOLVED_ORIGINAL_IMAGE: {x['name']} -> {final_output}")
            return final_output

    max_pixels = max(x['pixels'] for x in imgs)
    canvas_imgs = [x for x in imgs if x['pixels'] >= max_pixels * 0.85]
    
    opaque_bases = [x for x in canvas_imgs if x['is_opaque']]
    transparent_layers = [x for x in canvas_imgs if not x['is_opaque']]

    if opaque_bases and transparent_layers:
        base_info = max(opaque_bases, key=lambda x: (x['pixels'], x['size_bytes']))
        base_im = Image.open(base_info['path']).convert("RGBA")
        base_size = base_im.size

        for t in sorted(transparent_layers, key=lambda x: x['size_bytes']):
            try:
                layer_im = Image.open(t['path'])
                if layer_im.size != base_size:
                    layer_im = layer_im.resize(base_size, Image.Resampling.BILINEAR)
                base_im.alpha_composite(layer_im.convert("RGBA"))
            except:
                pass

        base_im.convert("RGB").save(final_output, quality=95)
        print(f"RESOLVED_CANVAS_COMPOSITE: {final_output} (base: {base_info['name']}, layers: {len(transparent_layers)})")
        return final_output

    best = max(imgs, key=lambda x: (1 if x['is_opaque'] else 0, x['pixels'], x['size_bytes']))
    im = Image.open(best['path'])
    if 'A' in im.mode:
        base_bg = Image.new("RGBA", im.size, (18, 18, 18, 255))
        base_bg.alpha_composite(im)
        im = base_bg.convert("RGB")
    else:
        im = im.convert("RGB")
    im.save(final_output, quality=95)
    print(f"RESOLVED_BEST_IMAGE: {best['name']} -> {final_output}")
    return final_output

if __name__ == "__main__":
    if len(sys.argv) > 1:
        res = resolve_scene(sys.argv[1])
        if res and os.path.exists(res):
            print("FINAL_RESULT:" + res)
        else:
            print("FINAL_RESULT:FAILED")

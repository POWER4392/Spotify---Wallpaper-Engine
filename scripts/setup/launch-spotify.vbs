Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
ScriptDir = FSO.GetParentFolderName(WScript.ScriptFullName)
RootDir = FSO.GetParentFolderName(ScriptDir)
SyncScript = RootDir & "\sync\sync-wallpaper.ps1"

Function IsBridgeRunning()
    On Error Resume Next
    Dim http
    Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
    http.setTimeouts 400, 400, 400, 400
    http.open "GET", "http://127.0.0.1:43196/status", False
    http.send
    If Err.Number = 0 Then
        IsBridgeRunning = True
    Else
        IsBridgeRunning = False
    End If
    On Error GoTo 0
End Function

If Not IsBridgeRunning() Then
    WshShell.Run "powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & SyncScript & """", 0, False
End If

SpotifyPath = WshShell.ExpandEnvironmentStrings("%APPDATA%\Spotify\Spotify.exe")
If Not FSO.FileExists(SpotifyPath) Then
    StorePath = WshShell.ExpandEnvironmentStrings("%LOCALAPPDATA%\Microsoft\WindowsApps\Spotify.exe")
    If FSO.FileExists(StorePath) Then SpotifyPath = StorePath
End If
Args = ""
For Each arg In WScript.Arguments
    Args = Args & " """ & arg & """"
Next

WshShell.Run """" & SpotifyPath & """" & Args, 1, False

Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
ScriptDir = FSO.GetParentFolderName(WScript.ScriptFullName)
Target = ScriptDir & "\setup\launch-spotify.vbs"
Args = ""
For Each arg In WScript.Arguments
    Args = Args & " """ & arg & """"
Next
WshShell.Run """" & Target & """" & Args, 1, False

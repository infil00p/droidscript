// adb push Hello.js /data/data/comikit.droidscript/files/

// How to work with the emulator
// Create an SD card image:
// mksdcard 256M sdcard.iso
// Launch emulator:
// emulator -avd myavd -sdcard sdcard.iso
// Copy files to the card:
// adb push Hello.js /sdcard/Hello.js
// Set up port forwarding to the emulator:
// adb forward tcp:4042 tcp:4042
// My start script
// source gods.sh
// (alias gods='source /path/to/script')


var AlertDialog = Packages.android.app.AlertDialog;
var DialogInterface = Packages.anroid.content.DialogInterface;
var Widget = Packages.android.widget;
var LayoutParams = Packages.android.view.ViewGroup.LayoutParams;
var View = Packages.android.view.View;
var Gravity = Packages.android.view.Gravity;
var Intent = Packages.android.content.Intent;
var Menu = Packages.android.view.Menu;
var Intent = Packages.android.content.Intent;
var Uri = Packages.android.net.Uri;
    
var Server;
var Editor;

function onCreate(icicle)
{
    var script = ''
        + 'var Widget = Packages.android.widget;\n'
        + 'var Gravity = Packages.android.view.Gravity;\n\n'
        + 'function onCreate(icicle) {\n'
        + '    var text = "Apps are early bound.\\n"\n'
        + '        + "The web is late bound.\\n"\n'
        + '        + "Apps are updated infrequently.\\n"\n'
        + '        + "The web updated frequently.\\n"\n'
        + '        + "JavaScript for apps means dynamics.\\n";\n'
        + '    var editor = new Widget.EditText(Activity);\n'
        + '    editor.setGravity(Gravity.TOP);\n'
        + '    editor.setText(text);\n'
        + '    Activity.setContentView(editor); }\n\n'
        + 'Widget.Toast.makeText(Activity,\n'
        + '    "Hello World! Tamejfan!",\n'
        + '    Widget.Toast.LENGTH_SHORT).show();\n'
    
    var editor = new Widget.EditText(Activity);
    editor.setLayoutParams(new Widget.LinearLayout.LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT, 1));
    editor.setGravity(Gravity.TOP);
    editor.setSelectAllOnFocus(false);
    editor.setVerticalScrollBarEnabled(true);
    editor.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_INSET);
//    editor.setScrollContainer(true);
    editor.setText(script);
    
    // Set global variable (yuck!)
    Editor = editor;
    
    var buttonEval = new Widget.Button(Activity);
    buttonEval.setLayoutParams(new Widget.LinearLayout.LayoutParams(
        LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
    buttonEval.setText("Evaluate");
    buttonEval.setOnClickListener(function () { 
        Activity.eval(editor.getText().toString()); });
        
    var buttonRun = new Widget.Button(Activity);
    buttonRun.setLayoutParams(new Widget.LinearLayout.LayoutParams(
        LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
    buttonRun.setText("Run Activity");
    buttonRun.setOnClickListener(function () { 
        var intent = new Intent();
        intent.setClassName(Activity, "comikit.droidscript.DroidScriptActivity");
        intent.putExtra("Script", editor.getText().toString());
        Activity.startActivity(intent); });
    
    var buttonOpen = new Widget.Button(Activity);
    buttonRun.setLayoutParams(new Widget.LinearLayout.LayoutParams(
        LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
    buttonOpen.setText("Open Script");
    buttonOpen.setOnClickListener(function () { openScript(); });
    
    var buttonLayout = new Widget.LinearLayout(Activity);
    buttonLayout.setOrientation(Widget.LinearLayout.HORIZONTAL);
    buttonLayout.setLayoutParams(new Widget.LinearLayout.LayoutParams(
        LayoutParams.FILL_PARENT,  LayoutParams.WRAP_CONTENT, 0));
    buttonLayout.addView(buttonOpen);
    buttonLayout.addView(buttonEval);
    buttonLayout.addView(buttonRun);
    
    var mainLayout = new Widget.LinearLayout(Activity);
    mainLayout.setOrientation(Widget.LinearLayout.VERTICAL);
    mainLayout.setLayoutParams(new Widget.LinearLayout.LayoutParams(
        LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
    mainLayout.addView(editor);
    mainLayout.addView(buttonLayout);

    Activity.setContentView(mainLayout);
}

function onResume()
{
    // print("onResume - starting server");
    // startServer();
}

function onPause()
{
    // print("onPause - stopping server");
    // stopServer();
}

function onCreateOptionsMenu(menu)
{
    return true;
}

function onPrepareOptionsMenu(menu)
{
    menu.clear();
    menu.add(Menu.NONE, Menu.FIRST + 10, Menu.NONE, "Open Script");
    menu.add(Menu.NONE, Menu.FIRST + 11, Menu.NONE, "Start Server");
    menu.add(Menu.NONE, Menu.FIRST + 12, Menu.NONE, "Reload");

    return true;
}

// "Satsa på onlineteknolgi istället för offlineteknologi" Göran on byggverktyg 20100201

function onOptionsItemSelected(item)
{
    if ((Menu.FIRST + 10) == item.getItemId()) 
    {
        openScript();
//        var intent = new Intent();
//        intent.setClassName(Activity, "comikit.droidscript.RhinoDroidWorkspace");
//        Activity.startActivity(intent); 
    }
    else
    if ((Menu.FIRST + 11) == item.getItemId()) 
    {
        openServer();
//        var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://comikit.se/"));
//        Activity.startActivity(intent); 
    }
    else
    if ((Menu.FIRST + 12) == item.getItemId()) 
    {
        Activity.openFileOrUrl(Activity.getScriptFileName());
    }
    else
    if ((Menu.FIRST + 13) == item.getItemId()) 
    {
        displayIpAddress();
    }
    
    return true;
}

function openScript()
{
    var input = new Widget.EditText(Activity);
    input.setText("droidscript/Toast.js")
    var dialog = new AlertDialog.Builder(Activity);
    dialog.setTitle("Open Script");
    dialog.setMessage("Enter file or url:");
    dialog.setView(input);
    dialog.setPositiveButton("Open", function() {
        var script = Packages.comikit.droidscript.DroidScriptFileHandler.create().readStringFromFileOrUrl(
                input.getText().toString());
        Editor.setText(script);
    });
    dialog.setNegativeButton("Cancel", function() {
    });
    dialog.show();
}

function openServer()
{
    // Launch new activity.
    var intent = new Intent();
    intent.setClassName(Activity, "comikit.droidscript.DroidScriptActivity");
    intent.putExtra("ScriptName", "droidscript/DroidScriptServer.js");
    Activity.startActivity(intent);
}

//function openScriptList()
//{
//    var list = new Widget.ListView(Activity);
//    var listAdapter = Widget.BaseAdapter({
//        
//    });
//
//}
//
//public class myListAdapter extends BaseAdapter {
//    public myListAdapter(Context c) { ...
//    public int getCount() { ...
//    public Object getItem(int position) { ...
//    public long getItemId(int position) { ...
//@Override
//    public View getView(int position, View convertView, ViewGroup parent) {
//
//            cursor.moveToPosition(position);
//             RowView rv;
//             if (convertView == null) {
//            rv = new RowView(mContext,(cursor.getString(2)),
//                            (cursor.getString(5)), position);
//        } else {
//            rv = (RowView) convertView;
//            rv.setTitle(cursor.getString(2));
//            rv.setDialogue(cursor.getString(5));
//            rv.setFocusable(true);
//            rv.setClickable(true);
//        }
//         return rv;
//       }
//
//}

function print(s)
{
    var System = Packages.java.lang.System;
    System.out.println(s);
}

function startServer()
{
    var DroidScriptServer = Packages.comikit.droidscript.DroidScriptServer;
    Server = DroidScriptServer.create();
    Server.setPort(4042);
    Server.setRequestHandler(function(url, data) {
        print("URL=" + url + " DATA=" + data);
        return "Hello";
    });
    Server.startServer();
}

function stopServer()
{
    Server.stopServer();
}

function displayIpAddress() 
{
    
}


//fun onOptionsItemSelected(item)
//    var Intent = Packages.android.content.Intent
//    var Uri = Packages.android.net.Uri
//    var Menu = Packages.android.view.Menu
//    
//    if ((Menu.FIRST + 1) == item.getItemId())
//        var intent = new Intent()
//        intent.setClassName(Activity, "comikit.rhinodroid.RhinoDroidWorkspace")
//        Activity.startActivity(intent)
//    else if ((Menu.FIRST + 2) == item.getItemId()) 
//        var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://comikit.se/"))
//        Activity.startActivity(intent)
//    
//    return true
//    
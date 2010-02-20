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
var DroidScript = Packages.comikit.droidscript;

var Server;
var MessageView;

function onCreate(icicle)
{
    var view = new Widget.TextView(Activity);
    view.setGravity(Gravity.TOP);
    view.setText(
        "Welcome to the DroidScript Live Server!\n"
        + "IP-address:\n"
        + DroidScript.DroidScriptServer.getIpAddressesAsString()
    );
    
    // Set global variable (yuck!)
    MessageView = view;

    Activity.setContentView(view);
}

function onResume()
{
    print("onResume - starting server");
    startServer();
}

function onPause()
{
    print("onPause - stopping server");
    stopServer();
}

function onCreateOptionsMenu(menu)
{
    return true;
}

function onPrepareOptionsMenu(menu)
{
    menu.clear();
    menu.add(Menu.NONE, Menu.FIRST + 10, Menu.NONE, "Show Messages");
    menu.add(Menu.NONE, Menu.FIRST + 12, Menu.NONE, "Stop server");
    menu.add(Menu.NONE, Menu.FIRST + 13, Menu.NONE, "Start server");
    menu.add(Menu.NONE, Menu.FIRST + 11, Menu.NONE, "Close");

    return true;
}

function onOptionsItemSelected(item)
{
    if ((Menu.FIRST + 10) == item.getItemId()) 
    {
        // Show message view.
        showMessages();
    }
    else
    if ((Menu.FIRST + 11) == item.getItemId()) 
    {
        // Close this activity.
    }
    else
    if ((Menu.FIRST + 12) == item.getItemId()) 
    {
        stopServer();
    }
    else
    if ((Menu.FIRST + 13) == item.getItemId()) 
    {
        startServer();
    }

    return true;
}

function showMessages()
{
    var dialog = new AlertDialog.Builder(Activity);
    dialog.setTitle("Messages");
    dialog.setView(MessageView);
    dialog.setPositiveButton("Close", function() {
    });
    dialog.show();
}

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
        return Activity.eval(data);
    });
    Server.startServer();
}

function stopServer()
{
    Server.stopServer();
}

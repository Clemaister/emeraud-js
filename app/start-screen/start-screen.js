function StartScreen(app){
    
    var ed = this;
    
    ed.init = function(){
        app.set_data("app-name", "Emeraud");
        
        var user_info = {
            firstname: "John",
            lastname: "Snow"
        }
        app.set_data("user-info", user_info);
    }
    
    ed.run = function(){
        console.log("Everything is OK "+app.get_data("user-info").firstname);
    }
    
}
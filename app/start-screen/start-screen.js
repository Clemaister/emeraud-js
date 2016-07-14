function StartScreen(app){
    
    var ed = this;
    
    ed.init = function(){
        
        app.set_data("app-name", "Emeraud");
        app.set_data("user-name", "John");

    }
    
    ed.run = function(){
        console.log("Everything is OK "+app.get_data("user-name"));
    }
    
}
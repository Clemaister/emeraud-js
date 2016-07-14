function StartScreen(app){
    
    var ed = this;
    
    ed.run = function(){
        
        app.set_data("name", "John")
        console.log("Everything is OK "+app.get_data("name")+".");
        
    }
    
}
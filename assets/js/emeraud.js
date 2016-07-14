function App(){
    
    var app = this;
    app.data = {};
    app.loaded_ed = false;
    
    app.load_view = function(ed_name, callback){
        
        $("[ed-view]").hide();
        
        if(app.loaded_ed){
            app.unload_asset(app.loaded_ed, "js");
            app.unload_asset(app.loaded_ed, "css");
        }
        
        var controller_path = "app/"+ed_name+"/";
        var javascript = false;
        var css = false;
        var view = false;
        
        $.ajax({
            url: controller_path+ed_name+".js",
            type: "GET",
            success: function(data){
                javascript = data;
                if(javascript!=false && css!=false && view!=false) app.ed_loaded(ed_name, javascript, css, view);
            }
        });
        
        $.ajax({
            url: controller_path+ed_name+".css",
            type: "GET",
            success: function(data, status, xhr){
                css = data;
                if(javascript!=false && css!=false && view!=false) app.ed_loaded(ed_name, javascript, css, view);
            }
        });
        
        $.ajax({
            url: controller_path+ed_name+".html",
            type: "GET",
            success: function(data){
                view = data;
                if(javascript!=false && css!=false && view!=false) app.ed_loaded(ed_name, javascript, css, view);
            }
        });

    }
    
    app.get_cont_func = function(ed_name){
        var splitter = ed_name.split("-");
        var ed_func = "";
        splitter.forEach(function(keyword){
            ed_func += keyword.charAt(0).toUpperCase()+keyword.slice(1);
        });
        return ed_func;
    }
    
    app.inject_asset = function(filename, filetype){
        if(filetype=="js"){
            var fileref=document.createElement('script')
            fileref.setAttribute("src", filename)
        }
        else if(filetype=="css"){
            var fileref=document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref!="undefined") document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    
    app.unload_asset = function(filename, filetype){
        var targetelement=(filetype=="js") ? "script" : (filetype=="css")? "link" : "none";
        var targetattr=(filetype=="js") ? "src" : (filetype=="css")? "href" : "none";
        var allsuspects=document.getElementsByTagName(targetelement);
        for (var i=allsuspects.length; i>=0; i--){
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
    }
    
    app.ed_loaded = function(ed_name, javascript, css, view){
        
        app.loaded_ed = ed_name;
        app.inject_asset("app/"+ed_name+"/"+ed_name+".js", "js");
        app.inject_asset("app/"+ed_name+"/"+ed_name+".css", "css");
        
        var ed_func = app.get_cont_func(ed_name);
        var emeraud = eval("new "+ed_func+"(app)");
        emeraud.init();
        $("[ed-view]").html(app.set_values(view));
        $("[ed-view]").fadeIn();
        emeraud.run();
        
    }
    
    app.set_data = function(key, data){
        app.data[key] = data;
    }
 
    app.get_data = function(key){
        return app.data[key];
    }
    
    app.set_values = function(source){
         return source.replace(/\|\|(.*?)\|\|/g, function(match){
             var key = match.replace(/\|\|/g, "");
             return app.data[key];
         });
    }
    
}
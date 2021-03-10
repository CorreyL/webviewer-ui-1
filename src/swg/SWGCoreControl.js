(function(){                       
    // constructor
    function SWG(){       
        this.userRole = 5;         
    }
    SWG.prototype.userRole;        
    this.getUserRole = function(){         
        return this.userRole;
    };
    this.setUserRole = function(userRole){          
        this.userRole = userRole;
    };
    window.swg = SWG;       
 }());
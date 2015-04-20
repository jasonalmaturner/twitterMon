import Dis from "flux";
var AppDispatcher = new Dis.Dispatcher();

AppDispatcher.handleAction = function(action){
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

export { AppDispatcher };

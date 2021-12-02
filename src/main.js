import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

String.prototype.match = function(regex) {
    const str = this.toString();
    let m;
    let cmp = 0;

    if ((m = regex.exec(str)) !== null) {
        // The result can be accessed through the `m`-variable.
        m.forEach(() => {
          cmp++;
        });
    }
    
    return cmp > 0;
};

createApp(App).use(router).mount('#app')

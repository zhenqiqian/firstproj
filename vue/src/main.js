import Vue from 'vue';
import App from './App';
import router from './router';
import axios  from 'axios';
Vue.prototype.$http = axios;
import { Button } from 'vant';
Vue.use(Button);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
import { Circle } from 'vant';
Vue.use(Circle);
import { List } from 'vant';
Vue.use(List);
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import { Icon } from 'vant';
Vue.use(Icon);
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import { NoticeBar } from 'vant';
Vue.use(NoticeBar);
import {GoodsAction,GoodsActionBigBtn,GoodsActionMiniBtn} from 'vant';
Vue.use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn);
import { NavBar } from 'vant';
Vue.use(NavBar);
import { Field } from 'vant';
Vue.use(Field);
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);
import { Loading } from 'vant';
Vue.use(Loading);
import { Popup } from 'vant';
Vue.use(Popup);
import '../static/css/style.css';
Vue.prototype.httpUrl = "http://test.iprbo.cn/wechat";  //注册全局
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

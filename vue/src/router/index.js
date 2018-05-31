import Vue from 'vue';
import Router from 'vue-router';

//个人中心
import center from '@/components/center/index';
import centerOrg from '@/components/center/org';
import centerInfo from '@/components/center/info';
import centerAdvice from '@/components/center/advice';
import centerActivity from '@/components/centerActivity/index';
import centerActivityEvaluation from '@/components/centerActivity/evaluation';
import centerInteractive from '@/components/center/interactive';
import centerReg from '@/components/center/reg';
//新闻
import news from '@/components/news/index';
import newsView from '@/components/news/view';
//学习
import learn from '@/components/learn/index';
import learnView from '@/components/learn/view';
//活动
import activity from '@/components/activity/index';
import activityView from '@/components/activity/view';
import activityReview from '@/components/activity/review';
import activityEnroll from '@/components/activity/enroll';
//互动
import interactive from '@/components/interactive/index';
//home
import home from '@/components/home';
Vue.use(Router);
//Vue.http.options.emulateJSON = true;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'news',
      component: news
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    //新闻
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/newsView/:id',
      name: 'newsView',
      component: newsView
    },
    //学习
    {
      path: '/learn',
      name: 'learn',
      component: learn
    },
    {
      path: '/learnView/:id',
      name: 'learnView',
      component: learnView
    },
    //活动
    {
      path: '/activity',
      name: 'activity',
      component: activity
    },
    {
      path: '/activityView/:id',
      name: 'activityView',
      component: activityView
    },
    {
      path: '/activityReview/:id',
      name: 'activityReview',
      component: activityReview
    },
    {
      path: '/activityEnroll/:id',
      name: 'activityEnroll',
      component: activityEnroll
    },
    //互动
    {
      path: '/interactive',
      name: 'interactive',
      component: interactive
    },
    //个人中心
    {
      path: '/center',
      name: 'center',
      component: center
    },
    {
      path: '/centerInfo',
      name: 'centerInfo',
      component: centerInfo
    },
    {
      path: '/centerOrg',
      name: 'centerOrg',
      component: centerOrg
    },
    {
      path: '/centerAdvice',
      name: 'centerAdvice',
      component: centerAdvice
    },
    {
      path: '/centerActivity',
      name: 'centerActivity',
      component: centerActivity
    },
    {
      path: '/centerActivityEvaluation/:id/:title',
      name: 'centerActivityEvaluation',
      component: centerActivityEvaluation
    },
    {
      path: '/centerInteractive',
      name: 'centerInteractive',
      component: centerInteractive
    },
    {
      path: '/centerReg',
      name: 'centerReg',
      component: centerReg
    }
  ]
});
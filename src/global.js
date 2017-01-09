//全局js引入
import Vue from 'vue';

window.Vue = Vue;

window.__debug__ = !process.env.NODE_ENV === 'production';
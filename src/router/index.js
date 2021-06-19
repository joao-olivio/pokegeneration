import Vue from 'vue'
import VueRouter from 'vue-router'

import generation from './generation';
import homepage from './homepage';
import pokemon from './pokemon';

Vue.use(VueRouter)

const routes = [
  generation,
  homepage,
  pokemon
]

export default new VueRouter({
  routes
})
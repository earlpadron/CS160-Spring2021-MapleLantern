//tests/unit/Home.spec.js

import { createLocalVue, shallowMount } from '@vue/test-utils'
import MapView from '@/components/MapView.vue'
import vuetify from "vuetify"
import VueRouter from 'vue-router'
import firebase from "firebase"

describe('ActivityCard.vue', () => {
  let wrapper;

  beforeEach(()=>{
    const localVue = createLocalVue()
    localVue.use(vuetify)
    localVue.use(VueRouter)
    const router = new VueRouter()

    wrapper = shallowMount(MapView, {
      localVue: localVue,
      router
    });
  })
  it('renders a vue instance', () => {
     expect(shallowMount(MapView).isVueInstance()).toBe(true);
   });

  // it('has an activity card', ()=>{
  // //  expect(wrapper.find('activity-card').selector).toBe('activity-card')
  //  expect(wrapper).toBe('activity-card')
  //   // expect(wrapper.find('v-card').exists()).toBe(true);
  // })

//  it('Checks the data-title', () => {
//    expect(wrapper.vm.title).toMatch('home')
//  })
    
})

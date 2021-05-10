//tests/unit/Home.spec.js

import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import ActivityCard from '@/components/ActivityCard.vue'
import vuetify from "vuetify"
import VueRouter from 'vue-router'
import firebase from "firebase"

describe('ActivityCard.vue', () => {
  let wrapper;
  let title = 'ActivityCard'
  beforeEach(()=>{
    const localVue = createLocalVue()
    localVue.use(vuetify)
    const router = new VueRouter()

    wrapper = shallowMount(ActivityCard, {
      localVue,
      router
    });
  })
  it('renders a vue instance', () => {
     expect(shallowMount(ActivityCard).isVueInstance()).toBe(true);
   });

  it('has an v-card', ()=>{
   expect(wrapper.find('v-card').selector).toBe('v-card')
    // expect(wrapper.find('v-card').exists()).toBe(true);
  })

//  it('Checks the data-title', () => {
//    expect(wrapper.vm.title).toMatch('home')
//  })
    
})

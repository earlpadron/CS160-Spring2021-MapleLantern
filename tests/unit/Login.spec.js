//tests/unit/Home.spec.js

import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import vuetify from "vuetify"
import VueRouter from 'vue-router';
import firebase from "firebase"

describe('Login.vue', () => {
  let wrapper;

  beforeEach(()=>{
    const localVue = createLocalVue()
    localVue.use(vuetify)
    localVue.use(VueRouter);
      
    wrapper = shallowMount(Login, {
      localVue: localVue,
      stubs: ['router-link', 'router-view']
    });
  })
  it('renders a vue instance', () => {
     expect(shallowMount(Login).isVueInstance()).toBe(true);
   });

  it('has an v-card', ()=>{
   expect(wrapper.find('v-card').selector).toBe('v-card')
    // expect(wrapper.find('v-card').exists()).toBe(true);
  })

  it('has an v-text-field', ()=>{
    expect(wrapper.find('v-text-field').selector).toBe('v-text-field')
    // expect(wrapper.find('v-text-field').exists()).toBe(true);
  })

  it('should render btn as anchor tag', () => {
    let btn = wrapper.find('.mr-4');
    expect(btn.exists()).toBe(true);
  });
    
  it('should anchor tag with proper edit url', () => {
    let link = wrapper.find('p');
    expect(link.exists()).toBe(true);
    expect(link.html()).toContain('to="/sign-up"');
  });
    
})

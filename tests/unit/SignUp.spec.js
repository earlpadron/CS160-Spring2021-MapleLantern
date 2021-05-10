//tests/unit/Home.spec.js

import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import SignUp from '@/views/SignUp.vue'
import Vuetify from "vuetify"
import VueRouter from 'vue-router';

describe('SignUp.vue', () => {
  let wrapper;
  let vuetify;

  beforeEach(()=>{
    vuetify = new Vuetify()
    const localVue = createLocalVue()
    localVue.use(vuetify)
    localVue.use(VueRouter);
      
    wrapper = shallowMount(SignUp, {
      localVue: localVue,
      vuetify,
      stubs: ['router-link', 'router-view']
    });
  })
    
  it('should anchor tag with proper edit url', () => {
    let link = wrapper.find('p');
    expect(link.exists()).toBe(true);
    expect(link.html()).toContain('to="/login"');
  });
    
  it('renders a vue instance', () => {
     expect(shallowMount(SignUp).isVueInstance()).toBe(true);
   });

  it('has an v-form', ()=>{
    let link = wrapper.find('v-form');
    expect(link.selector).toBe("v-form");
  })
    
})

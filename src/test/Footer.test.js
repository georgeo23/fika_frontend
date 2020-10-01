import React from 'react'
import Footer from '../components/Footer'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

describe('Footer', () => {
    let component;

    beforeEach(() => {
        // some pre-test setup
        store = mockStore({
            user: 'bhuma'
        });

        component = renderer.create(
            <Provider store={store}>
              <Footer/>
            </Provider>
        );
    });

    test("it should contain sentence", ()=>{
        expect(component.find('h3').text()).toContain('bits and bobs')
    });
})
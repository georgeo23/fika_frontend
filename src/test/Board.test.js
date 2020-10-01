import Board from '../components/Board'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
 
const mockStore = configureStore([]);

describe('Dashboard', () => {
    let component, store;
    

    beforeEach(() => {
        store = mockStore({
            user: 'bhuma'
        });
        component = renderer.create(
            <Provider store={store}>
              <Board/>
            </Provider>
        );

    });

    test("it renders with state to be true", () => {
        expect(component.state('xIsNext')).toBe(true)
    });
    test("it renders with state to be null", () => {
        expect(component.state('player1')).toBe(null)
    });
    test("it renders with state to be null", () => {
        expect(component.state('player2')).toBe(null)
    });

    test("There are Play As headers", () => {
        expect(component.find('h3')).toHaveLength(2)
    });
    
    test("it should contain sentence", ()=>{
        expect(component.find('h3').text()).toContain('Play As')
    });

    test("on click", () => {
        const mockCallBack = jest.fn();
  
        const button = shallow((<Board onClick={mockCallBack}>Ok!</Board>));
        button.find('button').simulate('click');
        expect(mockCallBack).toHaveBeenCalled();
      });


})
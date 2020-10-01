import UserMessage from '../components/UserMessage'

describe('Chat Input', () => {
    let component;

    beforeEach(() => {
        component = shallow(<UserMessage />);
    })
    test("the Chat Message has 3 divs", () => {
        expect(component.find('div').toHaveLength(3));
    })
})
import ChatMessage from '../components/ChatMessage'

describe('Chat Input', () => {
    let component, chatMessage;
    let fakeEvent = { preventDefault: () => "do nothing" }; 

    beforeEach(() => {
        component = shallow(<ChatMessage />);
    })
    test("the Chat Message has 3 divs", () => {
        expect(component.find('div').toHaveLength(3));
    })
})
import { shallow } from 'enzyme'
import { v4 } from 'uuid'

import CardContainer from './CardContainer'

const generateCard = () => ({ id: v4() })

it('renders all the cards passed to it', () => {
    const wrapper = shallow(<CardContainer cards={[generateCard(), generateCard()]} />)
    expect(wrapper.find('[test-id="card-container"]').children().length).toEqual(2)
})

it('renders a title if a title prop is passed to it', () => {
    const title = 'Title'
    const wrapper = shallow(<CardContainer cards={[generateCard()]} title={title} />)

    const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1)

    expect(wrapper.children().containsMatchingElement(<h2>{formattedTitle}</h2>)).toBeTruthy()
})
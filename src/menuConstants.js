// menuConstants.js
import About from './About';
import AiAndMl from './AiAndMl';
import AppDevelopment from './AppDevelopment';
import Climbing from './Climbing';
import Contact from './Contact';

export const MENU_ITEMS = [
    { name: 'About', component: <About /> },
    { name: 'AI and Machine Learning', component: <AiAndMl /> },
    { name: 'Application Development', component: <AppDevelopment /> },
    { name: 'Climbing Expeditions', component: <Climbing /> },
    { name: 'Contact', component: <Contact /> },
  ];
  
  export function getMenuItemComponent(name) {
    return MENU_ITEMS.find((item) => item.name === name);
  }
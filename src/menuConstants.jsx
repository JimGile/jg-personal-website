// menuConstants.jsx
import About from './About';
import ExpeditionList from './ExpeditionList';
import Contact from './Contact';

export const MENU_ITEMS = [
  { name: 'About', component: <About /> },
  { name: 'Expeditions', component: <ExpeditionList /> },
  { name: 'Contact', component: <Contact /> },
];

export function getMenuItemComponent(name) {
  return MENU_ITEMS.find((item) => item.name === name);
}
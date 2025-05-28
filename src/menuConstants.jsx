// menuConstants.jsx
import ExpeditionList from './ExpeditionList';
import Contact from './Contact';
import GenericMarkdownContent from './GenericMarkdownContent';
import HikingIcon from '@mui/icons-material/Hiking';
import TerrainIcon from '@mui/icons-material/Terrain';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import DescriptionIcon from '@mui/icons-material/Description';
import { NavigationMenuItem } from './NavigationMenuItem';

export const MENU_ITEMS = [
  new NavigationMenuItem({
    name: 'About',
    type: 'link',
    path: '/about',
    icon: <InfoIcon />,
    component: <GenericMarkdownContent sectionId="about" />,
  }),
  new NavigationMenuItem({
    name: 'Expeditions',
    type: 'link',
    path: '/expeditions',
    icon: <HikingIcon />,
    component: <ExpeditionList />,
  }),
  new NavigationMenuItem({
    name: 'Altitude',
    type: 'link',
    path: '/altitude',
    icon: <TerrainIcon />,
    component: <ExpeditionList />,
    children: [
      new NavigationMenuItem({
        name: 'What Is Altitude',
        type: 'link',
        path: '/altitude/what-is-it',
        icon: <DescriptionIcon />,
        component: <GenericMarkdownContent sectionId="what_is_altitude" />,
      }),
      new NavigationMenuItem({
        name: 'Altitude Real Feel',
        type: 'link',
        path: '/altitude/real-feel',
        icon: <DescriptionIcon />,
        component: <GenericMarkdownContent sectionId="altitude_real_feel" />,
      }),
      new NavigationMenuItem({
        name: 'Climbing Without Oxygen',
        type: 'link',
        path: '/altitude/climbing-without-oxygen',
        icon: <DescriptionIcon />,
        component: <GenericMarkdownContent sectionId="climbing_without_oxygen" />,
      }),
    ],
  }),
  new NavigationMenuItem({
    name: 'Contact',
    type: 'link',
    path: '/contact',
    icon: <MailIcon />,
    component: <Contact />,
  }),
];

export function getMenuItemComponent(path) {
  function findComponent(items) {
    for (const item of items) {
      if (item.path === path && item.component) return item.component;
      if (item.children && item.children.length) {
        const found = findComponent(item.children);
        if (found) return found;
      }
    }
    return null;
  }
  return findComponent(MENU_ITEMS);
}
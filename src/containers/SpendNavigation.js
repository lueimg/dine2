import Header, { HOCHeader } from '../components/Header.js';

import FormSpent from './FormSpent.js';
import ListSpend from './ListSpend.js';
import Profile from './Profile.js';
import {TabNavigator} from "react-navigation";

const RouteConfig = {
  Form: {
    screen: FormSpent,
  },
  List: {
    screen: ListSpend
  },
  Logout: {
    screen: Profile
  }
}

const TabNavigatorConfig = {
  tabBarPosition: 'bottom', // top
}

const SpendNavigation = TabNavigator(RouteConfig, TabNavigatorConfig);


export default SpendNavigation;
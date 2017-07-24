import Header, { HOCHeader } from '../components/Header.js';
import {TabBarBottom, TabNavigator} from "react-navigation";

import FormSpent from './FormSpent.js';
import ListSpend from './ListSpend.js';
import Profile from './Profile.js';

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
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom', // top
}

const SpendNavigation = TabNavigator(RouteConfig, TabNavigatorConfig);


export default SpendNavigation;
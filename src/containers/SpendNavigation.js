import FormSpent from './FormSpent.js';
import ListSpend from './ListSpend.js';
import Profile from './Profile.js';
import {TabNavigator} from "react-navigation";

const TabNavigatorConfig = {
  tabBarPosition: 'bottom', // top
}

const SpendNavigation = TabNavigator({
  Form: {
    screen: FormSpent
  },
  List: {
    screen: ListSpend
  },
  Logout: {
    screen: Profile
  }
}, TabNavigatorConfig);


export default SpendNavigation;
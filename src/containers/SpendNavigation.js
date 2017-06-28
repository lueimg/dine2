import {TabNavigator} from "react-navigation";
import FormSpent from './FormSpent.js';
import ListSpend from './ListSpend.js';
import Profile from './Profile.js';

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
});


export default SpendNavigation;
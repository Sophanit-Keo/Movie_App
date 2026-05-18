
import { createStaticNavigation } from '@react-navigation/native';
import {AuthStack} from './src/Navigation/AuthStack';
const Navigation = createStaticNavigation(AuthStack);

export default function App() {

  return (
      <Navigation />
  );
}

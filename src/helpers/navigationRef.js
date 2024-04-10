import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(name, params) {
  navigationRef.current?.push(name, params);
}

export function toggleDrawer(routeName, params) {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}
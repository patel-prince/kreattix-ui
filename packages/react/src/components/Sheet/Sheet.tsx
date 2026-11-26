import React from 'react';
import { Drawer, type DrawerProps } from '../Drawer/Drawer';

export type SheetProps = DrawerProps;

/**
 * Sheet is an ergonomic bottom/side action sheet built on Radix Dialog.
 */
export function Sheet({ side = 'bottom', ...rest }: SheetProps) {
  return <Drawer side={side} {...rest} />;
}

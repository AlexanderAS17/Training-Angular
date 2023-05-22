import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PostModule {
  title: string,
  content: string,
  id?: string
}

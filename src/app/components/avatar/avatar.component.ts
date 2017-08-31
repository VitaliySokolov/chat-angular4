import { Component, OnInit, Input } from '@angular/core';

export const DEFAULT_NAME = 'Guest';
export const DEFAULT_SIZE = 50;

@Component({
  selector: 'ct-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() name = DEFAULT_NAME;
  @Input() lineStatus = false;
  @Input() showStatus = true;
  @Input() round = true;
  @Input() size = DEFAULT_SIZE;
  bgColor = '#000';

  constructor() {}

  ngOnInit() {
    this.bgColor = getRandomColor(this.name.split(/\s/));
  }

}

const defaultColors = [
  '#d73d32', '#da611e',
  '#7e3794', '#093145',
  '#4285f4', '#1287a8',
  '#67ae3f', '#0d3d56',
  '#d61a7f', '#3c6478',
  '#ff4080', '#9a2617',
  '#0197d9', '#d3b53d',
  '#e35c52', '#c02f1d',
  '#7b1fa2', '#cd594a',
  '#2d660d', '#93a661'
];

function getRandomColor(value, colors = defaultColors) {
  if (!value) {
    return 'transparent';
  }
  const sum = [...value].map(letter => letter.charCodeAt(0))
    .reduce((current, previous) => previous + current);
  const colorIndex = (sum % colors.length);
  return colors[colorIndex];
}

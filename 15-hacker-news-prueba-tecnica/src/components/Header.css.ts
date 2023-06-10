import { style } from '@vanilla-extract/css';

export const header = style({
  backgroundColor: '#333',
});

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  margin: '0 auto',
  padding: '12px 0',
  width: '80%',
});

export const logo = style({
  width: '60px',
  height: '60px',
});

export const link = style({
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: 0,
  textDecoration: 'none',
});

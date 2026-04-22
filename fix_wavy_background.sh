sed -i 's/children?: any;/children?: React.ReactNode;/g' src/components/aceternity/wavy-background.tsx
sed -i 's/ctx: any/ctx: CanvasRenderingContext2D | null/g' src/components/aceternity/wavy-background.tsx
sed -i 's/canvas: any;/canvas: HTMLCanvasElement | null;/g' src/components/aceternity/wavy-background.tsx

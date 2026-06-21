import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/syne/600.css';
import '@fontsource/syne/700.css';
import './globals.css';

export const metadata = {
  title: 'LocalSync | Websites built for local growth',
  description: 'Premium, fast and conversion-focused websites for ambitious small businesses.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

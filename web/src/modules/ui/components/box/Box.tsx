'use client';
export const Box = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="shadow-xl p-4 w-75 bg-white rounded-lg">{children}</div>;
};

import dynamic from "next/dynamic";
const TinaProvider = dynamic(() => import("./TinaProvider"), { ssr: false });
import { TinaEditProvider } from "tinacms/dist/edit-state";
import type { ReactNode } from "react";

const DynamicTina = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TinaEditProvider editMode={<TinaProvider>{children}</TinaProvider>}>
        {children}
      </TinaEditProvider>
    </>
  );
};

export default DynamicTina;

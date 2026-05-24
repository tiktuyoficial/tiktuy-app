import { useCallback, useEffect, useState } from "react";
import { useRoleUiConfig } from "@/auth/constants/useRoleUiConfig";
import { useAuth } from "@/auth/context";
import { fetchPerfilTrabajadores } from "@/services/ecommerce/perfiles/perfilesTrabajador.api";
import type { PerfilTrabajador } from "@/services/ecommerce/perfiles/perfilesTrabajador.types";
import PerfilesCourierTable from "@/shared/components/courier/perfiles/PerfilesCourierTable";
import PerfilesCourierModal from "@/shared/components/courier/perfiles/PerfilerCourierModal";
import Tittlex from "@/shared/common/Tittlex";
import Buttonx from "@/shared/common/Buttonx";

export default function PerfilesPage() {
  const { token } = useAuth();
  const config = useRoleUiConfig();
  const [data, setData] = useState<PerfilTrabajador[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const loadPerfiles = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchPerfilTrabajadores(token);
      setData(res || []);
    } catch (e) {
      console.error("Error al cargar perfiles courier", e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadPerfiles();
  }, [loadPerfiles]);

  return (
    <section className="mt-8">
      <div className="flex justify-between items-end">
        <Tittlex
          title={config.labels.perfilesTitle}
          description={config.labels.perfilesSubtitle}
        />
        <Buttonx
            icon="ci:user"
            label={config.labels.perfilesCreateButton}
            variant="secondary"
            onClick={() => setModalOpen(true)}
          />
      </div>

      <PerfilesCourierTable
        data={data}
        loading={loading}
        onReload={loadPerfiles} // el table recargará tras editar
      />

      <PerfilesCourierModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={loadPerfiles} // recarga tras crear
      />
    </section>
  );
}

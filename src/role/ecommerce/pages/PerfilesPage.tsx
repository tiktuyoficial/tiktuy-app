import { useState, useCallback } from 'react';
import { useRoleUiConfig } from '@/auth/constants/useRoleUiConfig';
import PerfilesTable from '@/shared/components/ecommerce/perfiles/PerfilesTable';
import PerfilFormModal from '@/shared/components/ecommerce/perfiles/PerfilFormModal';
import PerfilEditModal from '@/shared/components/ecommerce/perfiles/PerfilEditModal';
import type { PerfilTrabajador } from '@/services/ecommerce/perfiles/perfilesTrabajador.types';
import Buttonx from '@/shared/common/Buttonx';
import Tittlex from '@/shared/common/Tittlex';

export default function PerfilesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<PerfilTrabajador | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const config = useRoleUiConfig();

  // 🔄 dispara recarga de la tabla
  const reloadTable = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  return (
    <section className="mt-8">
      <div className="flex justify-between">
        <Tittlex
          title={config.labels.perfilesTitle}
          description={config.labels.perfilesSubtitle}
        />
        <div className="flex items-end">
          <Buttonx
            label={config.labels.perfilesCreateButton}
            icon="solar:user-broken" // Icono correspondiente
            variant="secondary" // Usamos "secondary" cuando está activo
            onClick={() => setModalOpen(true)}
            disabled={false}
          />
        </div>
      </div>

      <div>
        {/* pasamos reloadKey para forzar recarga cuando se actualiza */}
        <PerfilesTable
          key={reloadKey}
          onEdit={(perfil) => {
            setSelected(perfil);
            setEditOpen(true);
          }}
        />
      </div>

      {/* Modal de crear */}
      <PerfilFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={reloadTable}
      />

      {/* Modal de editar */}
      <PerfilEditModal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelected(null);
        }}
        trabajador={selected}
        onUpdated={reloadTable}
      />
    </section>
  );
}

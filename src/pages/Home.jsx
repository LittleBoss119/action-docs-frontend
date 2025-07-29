import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/shared/SearchInput";
import ActionList from "../components/action/ActionList";
import ActionDetail from "../components/action/ActionDetail";
import ActionFormModal from "../components/action/ActionFormModal";

const API_URL = "https://api-docs-backend-production.up.railway.app/api/actions";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [actions, setActions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setActions)
      .catch((err) => console.error("Gagal memuat actions:", err));
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredActions = actions.filter((a) =>
    `${a.name} ${a.description} ${a.domain} ${a.keyword?.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleEdit = (action) => {
    setEditing(action);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin ingin menghapus action ini?");
    if (!confirmed) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setActions((prev) => prev.filter((a) => a.id !== id));
      setSelected(null);
      showToast("Action berhasil dihapus.");
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  const handleSaveAction = async (data) => {
    try {
      if (editing) {
        await fetch(`${API_URL}/${editing.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setActions((prev) =>
          prev.map((a) => (a.id === editing.id ? { ...editing, ...data } : a))
        );
        setSelected((prev) =>
          prev?.id === editing.id ? { ...editing, ...data } : prev
        );
        showToast("Action berhasil diperbarui.");
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const newAction = await res.json();
        setActions((prev) => [newAction, ...prev]);
        showToast("Action berhasil ditambahkan.");
      }
    } catch (err) {
      console.error("Gagal menyimpan:", err);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden h-[calc(100vh-120px)] px-4 pb-2">
        {/* Sidebar kiri */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sticky Header: Add + Search */}
          <div className="sticky top-0 z-10 bg-gray-50 pb-2 pt-2">
            <button
              onClick={() => setShowForm(true)}
              className="mb-2 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 w-full"
            >
              + Add Action
            </button>
            <SearchInput value={search} onChange={setSearch} />
            <p className="mt-2 text-xs text-gray-500">
              Menampilkan {filteredActions.length} action
            </p>
          </div>

          {/* Scrollable List */}
          <div className="overflow-y-auto pr-2 pb-7">
            <ActionList
              actions={filteredActions}
              onSelect={setSelected}
              selectedId={selected?.id}
            />
          </div>
        </div>

        {/* Panel kanan */}
        <div className="md:col-span-2 overflow-y-auto h-full pl-2">
          {selected ? (
            <ActionDetail
              action={selected}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-600 px-4 py-32">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Action Documentation
              </h2>
              <p className="text-base max-w-xl">
                Selamat datang di dokumentasi action internal. Pilih salah satu action di sebelah kiri untuk melihat detailnya, atau klik <strong>+ Add Action</strong> untuk menambahkan action baru.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <ActionFormModal
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSaveAction}
          existing={editing}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}
    </Layout>
  );
};

export default Home;

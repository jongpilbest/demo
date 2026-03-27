interface EditFormWrapperProps<T> {
  title: string;
  onCancel: () => void;
  onSave: (data: T) => void;
  children: React.ReactNode;
}

const EditFormWrapper = <T extends Record<string, any>>({
  title,
  onCancel,
  onSave,
  children
}: EditFormWrapperProps<T>) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as T;

    console.log(data);

    onSave(data);
  };

  return (
    <section className="bg-white rounded-lg mb-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{title}</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {children}
        </div>

        <div className="flex justify-end gap-2 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-10 py-2 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50 font-medium"
          >
            취소
          </button>

          <button
            type="submit"
            className="px-10 py-2 text-sm bg-[#1e7e34] text-white rounded hover:bg-green-700 font-medium"
          >
            변경
          </button>
        </div>
      </form>
    </section>
  );
};

export default
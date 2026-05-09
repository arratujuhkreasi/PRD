'use client';

import { ReactNode } from 'react';

interface DynamicListInputProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addButtonText?: string;
  emptyMessage?: string;
  className?: string;
}

export default function DynamicListInput<T extends { id: string }>({
  items,
  onAdd,
  onRemove,
  renderItem,
  addButtonText = '+ Tambah Baris',
  emptyMessage = 'Belum ada data',
  className = '',
}: DynamicListInputProps<T>) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.length === 0 ? (
        <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-gray-400 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="relative group">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-500">
                {index + 1}
              </div>
              <div className="ml-2">
                {renderItem(item, index)}
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="absolute -right-2 top-3 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="Hapus"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onAdd}
        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {addButtonText}
      </button>
    </div>
  );
}

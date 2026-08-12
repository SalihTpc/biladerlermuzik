"use client";

import { useMemo, useState } from "react";
import { Button, Select } from "antd";
import BaglamaCard from "@/components/BaglamaCard";
import { resolveOptionId } from "@/lib/baglamaOptions";
import { boyut, govdeAgaci, tekneBoyu, tip } from "@/lib/generalValues";
import type { Baglama } from "@/lib/Interfaces";

type SortKey = "newest" | "oldest" | "priceAsc" | "priceDesc";

const BOYUT_OPTIONS = boyut.map((b) => ({ id: b.id, label: b.tip }));
const TIP_OPTIONS = tip.map((t) => ({ id: t.id, label: t.isim }));
const GOVDE_OPTIONS = govdeAgaci.map((g) => ({ id: g.id, label: g.isim }));

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Önce yeni" },
  { value: "oldest", label: "Önce eski" },
  { value: "priceAsc", label: "En düşük fiyat" },
  { value: "priceDesc", label: "En yüksek fiyat" },
];

function createdAtSeconds(item: Baglama): number {
  const raw = item.created_at;
  if (typeof raw === "number" && !Number.isNaN(raw)) return raw;
  return 0;
}

type Props = {
  items: Baglama[];
};

export default function BaglamaCatalog({ items }: Props) {
  const [boyutFilter, setBoyutFilter] = useState<number | undefined>();
  const [tipFilter, setTipFilter] = useState<number | undefined>();
  const [govdeFilter, setGovdeFilter] = useState<number | undefined>();
  const [tekneFilter, setTekneFilter] = useState<number | undefined>();
  const [sort, setSort] = useState<SortKey>("newest");

  const hasFilters =
    boyutFilter !== undefined ||
    tipFilter !== undefined ||
    govdeFilter !== undefined ||
    tekneFilter !== undefined;

  const visible = useMemo(() => {
    let list = items.filter((item) => {
      if (boyutFilter !== undefined) {
        if (resolveOptionId(item.boyut, BOYUT_OPTIONS) !== boyutFilter) {
          return false;
        }
      }
      if (tipFilter !== undefined) {
        if (resolveOptionId(item.tip, TIP_OPTIONS) !== tipFilter) {
          return false;
        }
      }
      if (govdeFilter !== undefined) {
        if (resolveOptionId(item.govdeAgaci, GOVDE_OPTIONS) !== govdeFilter) {
          return false;
        }
      }
      if (tekneFilter !== undefined) {
        if (Number(item.tekneBoyu) !== tekneFilter) {
          return false;
        }
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return createdAtSeconds(a) - createdAtSeconds(b);
        case "priceAsc":
          return (a.fiyat ?? 0) - (b.fiyat ?? 0);
        case "priceDesc":
          return (b.fiyat ?? 0) - (a.fiyat ?? 0);
        case "newest":
        default:
          return createdAtSeconds(b) - createdAtSeconds(a);
      }
    });

    return list;
  }, [items, boyutFilter, tipFilter, govdeFilter, tekneFilter, sort]);

  const clearFilters = () => {
    setBoyutFilter(undefined);
    setTipFilter(undefined);
    setGovdeFilter(undefined);
    setTekneFilter(undefined);
  };

  return (
    <div className="baglama-catalog">
      <div className="baglama-toolbar">
        <Select
          size="large"
          allowClear
          placeholder="Boyut"
          value={boyutFilter}
          onChange={(value) => setBoyutFilter(value)}
          options={BOYUT_OPTIONS.map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          className="baglama-toolbar__select"
        />
        <Select
          size="large"
          allowClear
          placeholder="Yapım şekli"
          value={tipFilter}
          onChange={(value) => setTipFilter(value)}
          options={TIP_OPTIONS.map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          className="baglama-toolbar__select"
        />
        <Select
          size="large"
          allowClear
          placeholder="Gövde ağacı"
          value={govdeFilter}
          onChange={(value) => setGovdeFilter(value)}
          options={GOVDE_OPTIONS.map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          className="baglama-toolbar__select"
        />
        <Select
          size="large"
          allowClear
          placeholder="Tekne boyu"
          value={tekneFilter}
          onChange={(value) => setTekneFilter(value)}
          options={tekneBoyu.map((item) => ({
            value: item,
            label: String(item),
          }))}
          className="baglama-toolbar__select"
        />
        <Select
          size="large"
          value={sort}
          onChange={(value) => setSort(value)}
          options={SORT_OPTIONS}
          className="baglama-toolbar__select baglama-toolbar__select--sort"
          aria-label="Sıralama"
        />
        {hasFilters ? (
          <Button type="link" onClick={clearFilters} className="baglama-toolbar__clear">
            Filtreleri temizle
          </Button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted">Seçilen filtrelere uygun bağlama yok.</p>
      ) : (
        <div className="baglama-grid">
          {visible.map((dat) => (
            <BaglamaCard
              key={dat.id}
              description={dat.description}
              title={dat.title}
              image={dat.images[0]}
              fiyat={dat.fiyat}
            />
          ))}
        </div>
      )}
    </div>
  );
}

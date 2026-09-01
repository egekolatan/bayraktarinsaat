"""
Bayraktar İnşaat — FastAPI Python Backend Server
"""

import sqlite3
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Bayraktar İnşaat API",
    description="Bayraktar İnşaat Bostanlı Konut Projeleri Python Backend Servisi",
    version="1.0.0"
)

# CORS Ayarları (React Frontend Bağlantısı)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "backend/bayraktar.db"


def init_db():
    """SQLite veritabanı tablolarını ilklendirir."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # İletişim / Randevu Talepleri Tablosu
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contact_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            note TEXT,
            status TEXT DEFAULT 'Beklemede',
            created_at TEXT NOT NULL
        )
    """)

    # Proje Bilgileri Tablosu
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            badge TEXT NOT NULL,
            location TEXT NOT NULL,
            summary TEXT NOT NULL
        )
    """)

    # Örnek Varsayılan Proje Verileri
    cursor.execute("SELECT COUNT(*) FROM projects")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
            INSERT INTO projects (id, title, badge, location, summary)
            VALUES (?, ?, ?, ?, ?)
        """, [
            ("bostanli1", "BAYRAKTAR I", "SATIŞTA & TESLİME YAKIN", "Bostanlı Mah. Karşıyaka / İzmir", "Bostanlı'da 5 katlı modern daireler. Kaliteli malzeme ve sağlam bina altyapısı."),
            ("bostanli2", "BAYRAKTAR II", "YENİ PROJE — ÖN SATIŞTA", "Bostanlı İskele Yakını / İzmir", "Bostanlı sahil aksında, modern mimarisi ve kaliteli detaylarıyla yükselen konut projesi.")
        ])

    conn.commit()
    conn.close()


init_db()


# Pydantic Veri Modelleri
class ContactCreate(BaseModel):
    name: str
    phone: str
    note: Optional[str] = None


class ContactResponse(BaseModel):
    id: int
    name: str
    phone: str
    note: Optional[str]
    status: str
    created_at: str


class ProjectModel(BaseModel):
    id: str
    title: str
    badge: str
    location: str
    summary: str


@app.get("/", tags=["Health"])
def root():
    return {
        "status": "online",
        "service": "Bayraktar İnşaat Backend API",
        "owner": "Ahmetcan Bayraktar & Bülent Bayraktar",
        "location": "Bostanlı / Karşıyaka / İzmir",
        "docs": "/docs"
    }


@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


@app.get("/api/projects", response_model=List[ProjectModel], tags=["Projects"])
def get_projects():
    """Tüm aktif konut projelerini listeler."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, badge, location, summary FROM projects")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


@app.post("/api/contact", response_model=ContactResponse, tags=["Contact"])
def create_contact_request(req: ContactCreate):
    """Yeni randevu / iletişim talebi kaydeder."""
    if not req.name.strip() or not req.phone.strip():
        raise HTTPException(status_code=400, detail="Ad soyad ve telefon alanı boş bırakılamaz.")

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contact_requests (name, phone, note, created_at) VALUES (?, ?, ?, ?)",
        (req.name.strip(), req.phone.strip(), req.note, now_str)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return ContactResponse(
        id=new_id,
        name=req.name.strip(),
        phone=req.phone.strip(),
        note=req.note,
        status="Beklemede",
        created_at=now_str
    )


@app.get("/api/contact", response_model=List[ContactResponse], tags=["Contact"])
def get_contact_requests():
    """Gelen tüm randevu ve iletişim taleplerini listeler (Yönetici Paneli)."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, phone, note, status, created_at FROM contact_requests ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

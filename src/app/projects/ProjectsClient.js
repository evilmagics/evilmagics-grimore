"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import ScrollReveal from "../../components/ScrollReveal";

export default function ProjectsClient({ projects = [] }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.summary?.toLowerCase().includes(search.toLowerCase());
      const matchTag =
        activeTag === "All" || p.tags?.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag, projects]);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        <section className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">:: Constructs.vault</span>
              <h1 className="section-title">The Blueprint Vault</h1>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div
              style={{
                maxWidth: "900px",
                margin: "0 auto 3rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {/* Search bar */}
              <div
                style={{
                  background: "#020a05",
                  border: "1px solid rgba(0,229,255,0.1)",
                  padding: "0.7rem 1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                }}
              >
                <span
                  style={{
                    color: "var(--mana)",
                    opacity: 0.5,
                    fontSize: "0.62rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  [search]$
                </span>
                <input
                  type="text"
                  placeholder="grep -i 'pattern' ./constructs/*"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "var(--mist)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    caretColor: "var(--mana)",
                  }}
                  spellCheck="false"
                />
              </div>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    style={{
                      fontSize: "0.46rem",
                      letterSpacing: "0.16em",
                      color:
                        activeTag === tag ? "#050505" : "var(--mana)",
                      background:
                        activeTag === tag ? "var(--mana)" : "transparent",
                      border: "1px solid rgba(0,229,255,0.16)",
                      padding: "0.25rem 0.65rem",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      if (activeTag !== tag) {
                        e.target.style.background = "var(--mana-dim)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTag !== tag) {
                        e.target.style.background = "transparent";
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Project Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {filtered.map((project) => (
              <ScrollReveal key={project.id}>
                <div
                  className="elec-target"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid rgba(0,229,255,0.08)",
                    cursor: "pointer",
                    transition: "all 0.4s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,229,255,0.08)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.08)";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  {/* Cover gradient */}
                  <div
                    style={{
                      height: "120px",
                      background: project.cover_gradient,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                        opacity: 0.04,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        right: "0.7rem",
                        width: "16px",
                        height: "16px",
                        borderTop: "1px solid rgba(0,229,255,0.3)",
                        borderRight: "1px solid rgba(0,229,255,0.3)",
                      }}
                    />
                  </div>

                  <div style={{ padding: "1.5rem" }}>
                    <span
                      style={{
                        fontSize: "0.46rem",
                        letterSpacing: "0.4em",
                        color: "rgba(0,229,255,0.38)",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {project.idx}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1rem",
                        color: "var(--mist)",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "0.8rem",
                        color: "rgba(224,224,224,0.36)",
                        lineHeight: 1.7,
                        marginBottom: "1.2rem",
                      }}
                    >
                      {project.summary}
                    </p>

                    {/* Mana Cost Bar */}
                    <div style={{ marginBottom: "1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.44rem",
                            letterSpacing: "0.2em",
                            color: "rgba(224,224,224,0.25)",
                            textTransform: "uppercase",
                          }}
                        >
                          Mana Cost
                        </span>
                        <span
                          style={{
                            fontSize: "0.44rem",
                            color: "var(--mana)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {project.mana_cost}/100
                        </span>
                      </div>
                      <div
                        style={{
                          height: "2px",
                          background: "rgba(0,229,255,0.08)",
                          borderRadius: "1px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${project.mana_cost}%`,
                            background:
                              "linear-gradient(to right, var(--mana), rgba(0,229,255,0.4))",
                            borderRadius: "1px",
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.35rem",
                      }}
                    >
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.44rem",
                            letterSpacing: "0.14em",
                            color: "var(--mana)",
                            border: "1px solid rgba(0,229,255,0.12)",
                            padding: "0.12rem 0.4rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "rgba(224,224,224,0.25)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
              }}
            >
              [err]$ No constructs match the current filter pattern.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

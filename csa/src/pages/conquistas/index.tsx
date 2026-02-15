"use client"

import DefaultPage from "csa/components/DefaultPage"
import { FiHeart } from "react-icons/fi"
import { FiChevronLeft } from "react-icons/fi"
import styles from "./conquistas.module.css"
import { mockConquistas, mockStats, Conquista } from "csa/mocks/conquistas"
import useNavigate from "csa/hooks/useNavigate"

export default function ConquistasPage() {
    const { goBack } = useNavigate()

    return (
        <DefaultPage>
            <div className={styles.page}>
                {/* Header */}
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={goBack}>
                        <FiChevronLeft />
                    </button>
                    <h1 className={styles.headerTitle}>CONQUISTA</h1>
                </div>

                {/* Big Card wrapping everything */}
                <div className={styles.bigCard}>
                    {/* Stats Panel */}
                    <div className={styles.statsPanel}>
                        <div className={styles.trophyArea}>
                            <span className={styles.trophyIcon}>🏆</span>
                        </div>
                        <div className={styles.statsRows}>
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>PONTOS OBTIDOS</span>
                                <span className={styles.statValue}>{mockStats.pontosObtidos}/{mockStats.pontosTotal}</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>CONQUISTAS</span>
                                <span className={styles.statValue}>{mockStats.conquistasObtidas}/{mockStats.conquistasTotal}</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>TEMPO DE ATIVIDADE</span>
                                <span className={styles.statValue}>{mockStats.tempoAtividade.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Achievement List */}
                    <div className={styles.list}>
                        {mockConquistas.map((c) => (
                            <ConquistaCard key={c.id} conquista={c} />
                        ))}
                    </div>
                </div>
            </div>
        </DefaultPage>
    )
}

function ConquistaCard({ conquista: c }: { conquista: Conquista }) {
    return (
        <div className={styles.card}>
            {/* Badge */}
            <div className={styles.badge} style={{ backgroundColor: c.badgeColor }}>
                <span className={styles.badgeIcon}>{c.icone}</span>
                <span className={styles.badgeName}>{c.titulo}</span>
            </div>

            {/* Text */}
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{c.titulo.toUpperCase()}</h3>
                <p className={styles.cardDescription}>{c.descricao.toUpperCase()}</p>
            </div>

            {/* Points */}
            <div className={styles.cardPoints}>
                <FiHeart className={styles.heartIcon} />
                <span className={styles.pointsValue}>{c.pontos}</span>
            </div>
        </div>
    )
}
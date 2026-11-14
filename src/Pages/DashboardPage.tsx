import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Boxes, Layers, Plus, Users, Wallet } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchProducts } from '../Redux/catalogSlice';
import { fetchUsers } from '../Redux/usersSlice';
import { Button, Card, PageTitle } from '../Shared/primitives';
import { LoadingView } from '../Shared/StatusView';
import { useTranslation } from '../Shared/useTranslation';
import { formatPrice } from '../Utils/formatPrice';
import { ROUTES } from '../Routes/routePaths';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 24px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 16px;
  .icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.accent};
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  span {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 6px;
  }
  strong {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const QuickActions = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
  }
  .buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const t = useTranslation();

  const {
    items: products,
    loading: productsLoading,
    loaded: productsLoaded,
  } = useAppSelector((s) => s.products);
  const {
    items: users,
    loading: usersLoading,
    loaded: usersLoaded,
  } = useAppSelector((s) => s.users);
  const language = useAppSelector((s) => s.settings.language);

  useEffect(() => {
    if (!productsLoaded) void dispatch(fetchProducts());
    if (!usersLoaded) void dispatch(fetchUsers());
  }, [dispatch, productsLoaded, usersLoaded]);

  const categoryCount = useMemo(
    () => new Set(products.map((p) => p.category)).size,
    [products],
  );

  const totalCatalogValue = useMemo(
    () => products.reduce((sum, item) => sum + item.price, 0),
    [products],
  );

  const isLoading =
    (productsLoading && !productsLoaded) || (usersLoading && !usersLoaded);

  return (
    <>
      <PageTitle>
        <div>
          <h1>{t('dashboard')}</h1>
          <p>{t('overview')}</p>
        </div>
      </PageTitle>

      {isLoading ? (
        <Card>
          <LoadingView />
        </Card>
      ) : (
        <>
          <StatsGrid>
            <StatCard>
              <div className="icon">
                <Boxes size={22} />
              </div>
              <div>
                <span>{t('totalProducts')}</span>
                <strong>{products.length}</strong>
              </div>
            </StatCard>

            <StatCard>
              <div className="icon">
                <Users size={22} />
              </div>
              <div>
                <span>{t('totalUsers')}</span>
                <strong>{users.length}</strong>
              </div>
            </StatCard>

            <StatCard>
              <div className="icon">
                <Layers size={22} />
              </div>
              <div>
                <span>{t('categories')}</span>
                <strong>{categoryCount}</strong>
              </div>
            </StatCard>

            <StatCard>
              <div className="icon">
                <Wallet size={22} />
              </div>
              <div>
                <span>{t('price')}</span>
                <strong>{formatPrice(totalCatalogValue, language)}</strong>
              </div>
            </StatCard>
          </StatsGrid>

          <QuickActions>
            <p>{t('dashboardHint')}</p>
            <div className="buttons">
              <Button onClick={() => navigate(ROUTES.createProduct)}>
                <Plus size={16} />
                {t('createProduct')}
              </Button>
              <Button
                $variant="secondary"
                onClick={() => navigate(ROUTES.createUser)}
              >
                <Plus size={16} />
                {t('createUser')}
              </Button>
            </div>
          </QuickActions>
        </>
      )}
    </>
  );
}

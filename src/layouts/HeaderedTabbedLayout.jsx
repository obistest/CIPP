import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import {
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ActionsMenu } from "/src/components/actions-menu";

export const HeaderedTabbedLayout = (props) => {
  const { children, tabOptions, title, subtitle, actions, isFetching = false } = props;

  const router = useRouter();
  const pathname = usePathname();

  const handleTabsChange = useCallback(
    (event, value) => {
      router.push(value);
    },
    [router]
  );

  const currentTab = tabOptions.find((option) => option.path === pathname);

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack spacing={4} sx={{ height: "100%" }}>
          <Stack spacing={2}>
            <div>
              <Button
                color="inherit"
                onClick={() => router.back()}
                startIcon={
                  <SvgIcon fontSize="small">
                    <ArrowLeftIcon />
                  </SvgIcon>
                }
              >
                Back to previous page
              </Button>
            </div>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <Stack spacing={1}>
                <Typography variant="h4">{title}</Typography>
                {isFetching ? (
                  <Skeleton variant="text" width={200} />
                ) : (
                  subtitle && (
                    <Stack alignItems="center" flexWrap="wrap" direction="row" spacing={2}>
                      {subtitle.map((item, index) => (
                        <Stack key={index} alignItems="center" direction="row" spacing={1}>
                          <SvgIcon fontSize="small">{item.icon}</SvgIcon>
                          <Typography color="text.secondary" variant="body2">
                            {item.text}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  )
                )}
              </Stack>
              {actions && actions.length > 0 && (
                <ActionsMenu actions={actions} disabled={isFetching} />
              )}
            </Stack>
            <div>
              <Tabs onChange={handleTabsChange} value={currentTab?.path} variant="scrollable">
                {tabOptions.map((option) => (
                  <Tab key={option.path} label={option.label} value={option.path} />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          {children}
        </Stack>
      </Container>
    </Box>
  );
};

HeaderedTabbedLayout.propTypes = {
  children: PropTypes.node,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ),
  isFetching: PropTypes.bool,
};

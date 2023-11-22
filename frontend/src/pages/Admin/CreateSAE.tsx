import {
  Box,
  Card,
  Chip,
  CssBaseline,
  CssVarsProvider,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import AuthChecker from "../../middlewares/AuthChecker";
import AdminOnly from "../../middlewares/AdminOnly";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";

import { useState } from "react";
import NewTopic from "../../components/CreateSAE/NewTopic";

export default function CreateSAE() {
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleInputBlur = () => {
    const words = inputText.split(",");
    setInputText(words.join(","));
  };

  return (
    <AuthChecker>
      <AdminOnly>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: "flex", minHeight: "100dvh" }}>
            <Header />
            <Sidebar />
            <Box
              component="main"
              className="MainContent"
              sx={{
                pt: {
                  xs: "calc(12px + var(--Header-height))",
                  md: 3,
                },
                pb: {
                  xs: 2,
                  sm: 2,
                  md: 3,
                },
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                height: "100dvh",
                gap: 1,
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    top: {
                      sm: -100,
                      md: -110,
                    },
                    bgcolor: "background.body",
                    zIndex: 9995,
                  }}
                >
                  <Box
                    sx={{
                      px: {
                        xs: 2,
                        md: 6,
                      },
                    }}
                  >
                    <Typography
                      level="h2"
                      sx={{
                        mt: 1,
                        mb: 2,
                      }}
                    >
                      Créer une SAE
                    </Typography>
                  </Box>
                </Box>

                <Stack
                  spacing={4}
                  sx={{
                    display: "flex",
                    maxWidth: "800px",
                    mx: "auto",
                    px: {
                      xs: 2,
                      md: 6,
                    },
                    py: {
                      xs: 2,
                      md: 3,
                    },
                  }}
                >
                  <Card>
                    <Box sx={{ mb: 1 }}>
                      <Typography level="title-md">Nouvelle SAE</Typography>
                      <Typography level="body-sm">
                        Ajouter une nouvelle SAE. <br />
                        Attention, une SAE contient un ou plusieurs sujets !
                      </Typography>
                    </Box>
                    <Divider />

                    {/** ############### */}
                    {/** ############### */}
                    {/** @CARTE_LG_SREEN */}
                    {/** ############### */}
                    {/** ############### */}
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={3}
                      my={1}
                    >
                      <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        {/**  ============ */}
                        {/** @STACK_DE_NOM */}
                        {/**  ==================== */}
                        <Stack spacing={1}>
                          <FormLabel>Nom</FormLabel>
                          <FormControl
                            sx={{
                              display: {
                                sm: "flex-column",
                                md: "flex-row",
                              },
                              gap: 2,
                            }}
                          >
                            <Input
                              size="sm"
                              placeholder="Insérer nom de la SAE"
                            />
                          </FormControl>
                        </Stack>

                        {/**  ==================== */}
                        {/** @STACK_DE_DESCRIPTION */}
                        {/**  ==================== */}
                        <Stack spacing={1}>
                          <FormLabel>Description</FormLabel>
                          <FormControl
                            sx={{
                              display: {
                                sm: "flex-column",
                                md: "flex-row",
                              },
                              gap: 2,
                            }}
                          >
                            <Textarea
                              minRows={4}
                              placeholder="Décrivez la SAE en quelques mots, rajoutez des liens vers des ressources externes si besoin"
                            ></Textarea>
                          </FormControl>
                        </Stack>

                        {/**  ================ */}
                        {/** @STACK_DE_GROUPES */}
                        {/**  ================ */}
                        <Stack>
                          <FormControl>
                            <FormLabel>Groupes Associés</FormLabel>
                            <Select
                              multiple
                              defaultValue={["3A", "3B"]}
                              renderValue={(selected) => (
                                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                  {selected.map((selectedOption) => (
                                    <Chip variant="soft" color="primary">
                                      {selectedOption.label}
                                    </Chip>
                                  ))}
                                </Box>
                              )}
                              sx={{
                                minWidth: "15rem",
                              }}
                              slotProps={{
                                listbox: {
                                  sx: {
                                    width: "100%",
                                  },
                                },
                              }}
                            >
                              <Option value="3A">3.A</Option>
                              <Option value="3B">3.B</Option>
                              <Option value="31">3.1</Option>
                              <Option value="32">3.2</Option>

                              <Option value="21A">2.1A</Option>
                              <Option value="21B">2.1B</Option>
                              <Option value="22A">2.2A</Option>
                              <Option value="22B">2.2B</Option>
                              <Option value="23A">2.3A</Option>
                              <Option value="23B">2.3B</Option>

                              <Option value="11A">1.1A</Option>
                              <Option value="11B">1.1B</Option>
                              <Option value="12A">1.2A</Option>
                              <Option value="12B">1.2B</Option>
                              <Option value="13A">1.3A</Option>
                              <Option value="13B">1.3B</Option>
                              <Option value="14A">1.4A</Option>
                              <Option value="14B">1.4B</Option>
                            </Select>
                          </FormControl>
                        </Stack>

                        {/**  ==================== */}
                        {/** @STACK_DE_COMPETENCES */}
                        {/**  ==================== */}
                        <Stack>
                          <FormControl>
                            <FormLabel>Champ Feuille de compétence</FormLabel>
                            <Input
                              value={inputText}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              placeholder="Ajouter des mots-clés"
                            />
                            <Box
                              sx={{
                                display: "flex",
                                gap: "0.25rem",
                                marginTop: "0.5rem",
                              }}
                            >
                              {inputText != "" ? (
                                inputText.split(",").map((word, index) => (
                                  <Chip
                                    key={index}
                                    variant="outlined"
                                    color="primary"
                                  >
                                    {word.trim()}
                                  </Chip>
                                ))
                              ) : (
                                <></>
                              )}
                            </Box>
                          </FormControl>
                        </Stack>

                        {/**  ======================= */}
                        {/** @STACK_DE_ETUDIANT_BY_GP */}
                        {/**  ======================= */}
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={2}
                        >
                          <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Min. Étudiant/Groupe</FormLabel>
                            <Input type="number" />
                          </FormControl>
                          <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Max. Étudiant/Groupe</FormLabel>
                            <Input
                              placeholder="Laisser vide pour illimité"
                              type="number"
                            />
                          </FormControl>
                        </Stack>

                        {/**  ======================== */}
                        {/** @STACK_DE_GROUPE_BY_TOPIC */}
                        {/**  ======================== */}
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={2}
                        >
                          <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Min. Groupe/Sujet</FormLabel>
                            <Input type="number" />
                          </FormControl>
                          <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Max. Groupe/Sujet</FormLabel>
                            <Input
                              placeholder="Laisser vide pour illimité"
                              type="number"
                            />
                          </FormControl>
                        </Stack>

                        {/**  ====================== */}
                        {/** @STACK_COACH_LINKED_SAE */}
                        {/**  ====================== */}
                        <Stack>
                          <FormControl>
                            <FormLabel>Coachs Associés</FormLabel>
                            <Select
                              multiple
                              defaultValue={[
                                "Esther Pendaries",
                                "Jean-Michel Bruel",
                              ]}
                              renderValue={(selected) => (
                                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                                  {selected.map((selectedOption) => (
                                    <Chip variant="soft" color="primary">
                                      {selectedOption.label}
                                    </Chip>
                                  ))}
                                </Box>
                              )}
                              sx={{
                                minWidth: "15rem",
                              }}
                              slotProps={{
                                listbox: {
                                  sx: {
                                    width: "100%",
                                  },
                                },
                              }}
                            >
                              <Option value="EP">Esther Pendaries</Option>
                              <Option value="PSE">Pablo Seban</Option>
                              <Option value="PSO">Pascal Sotin</Option>
                              <Option value="JMB">Jean-Michel Bruel</Option>
                            </Select>
                          </FormControl>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Card>

                  <NewTopic />
                </Stack>
              </Box>
            </Box>
          </Box>
        </CssVarsProvider>
      </AdminOnly>
    </AuthChecker>
  );
}